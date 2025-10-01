import { useGetContacts, useGetConversation, useGetConversations } from 'src/actions/chat';
import { useState, useEffect, useCallback, startTransition } from 'react';
import { useRouter, useSearchParams } from 'src/routes/hooks';
import { EmptyContent } from 'src/components/empty-content';
import { ChatHeaderCompose } from '../chat-header-compose';
import { useCollapseNav } from '../hooks/use-collapse-nav';
import { DashboardContent } from 'src/layouts/dashboard';
import { ChatMessageInput } from '../chat-message-input';
import { ChatHeaderDetail } from '../chat-header-detail';
import type { IChatParticipant } from 'src/types/chat';
import { ChatMessageList } from '../chat-message-list';
import Typography from '@mui/material/Typography';
import { useMockedUser } from 'src/auth/hooks';
import { CONFIG } from 'src/global-config';
import { paths } from 'src/routes/paths';
import { ChatRoom } from '../chat-room';
import { ChatLayout } from '../layout';
import { ChatNav } from '../chat-nav';

export function ChatView() {
  const router = useRouter();

  const { user } = useMockedUser();

  const { contacts } = useGetContacts();

  const searchParams = useSearchParams();
  const selectedConversationId = searchParams.get('id') || '';

  const { conversations, conversationsLoading } = useGetConversations();
  const { conversation, conversationError, conversationLoading } =
    useGetConversation(selectedConversationId);

  const roomNav = useCollapseNav();
  const conversationsNav = useCollapseNav();

  const [recipients, setRecipients] = useState<IChatParticipant[]>([]);

  useEffect(() => {
    if (!selectedConversationId) {
      startTransition(() => {
        router.push(paths.dashboard.chat);
      });
    }
  }, [conversationError, router, selectedConversationId]);

  const handleAddRecipients = useCallback((selected: IChatParticipant[]) => {
    setRecipients(selected);
  }, []);

  const filteredParticipants: IChatParticipant[] = conversation
    ? conversation.participants.filter(
      (participant: IChatParticipant) => participant.id !== `${user?.id}`
    )
    : [];

  const hasConversation = selectedConversationId && conversation;

  return (
    <DashboardContent
      maxWidth={false}
      sx={{ display: 'flex', flex: '1 1 auto', flexDirection: 'column' }}
    >
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        Chat With PrimeAI
      </Typography>

      <ChatLayout
        slots={{
          header: hasConversation ? (<></>
            // <ChatHeaderDetail
            //   collapseNav={roomNav}
            //   participants={filteredParticipants}
            //   loading={conversationLoading}
            // />
          ) : (
            <></>
            // <ChatHeaderCompose contacts={contacts} onAddRecipients={handleAddRecipients} />
          ),
          nav: <></>,
          // nav: (
          //   <ChatNav
          //     contacts={contacts}
          //     conversations={conversations}
          //     selectedConversationId={selectedConversationId}
          //     collapseNav={conversationsNav}
          //     loading={conversationsLoading}
          //   />
          // ),
          main: (
            <>
              {selectedConversationId ? (
                conversationError ? (
                  <EmptyContent
                    title={conversationError.message}
                    // imgUrl={`${CONFIG.assetsDir}/assets/icons/empty/ic-chat-empty.svg`}
                    imgUrl={`${CONFIG.assetsDir}/logo/logo-single.png`}
                  />
                ) : (
                  <ChatMessageList
                    messages={conversation?.messages ?? []}
                    participants={filteredParticipants}
                    loading={conversationLoading}
                  />
                )
              ) : (
                <EmptyContent
                  title="Ask to PrimeAI!"
                  description="How are sales today?"
                  imgUrl={`${CONFIG.assetsDir}/logo/logo-single.png`}
                />
              )}

              <ChatMessageInput
                recipients={recipients}
                onAddRecipients={handleAddRecipients}
                selectedConversationId={selectedConversationId}
                disabled={!recipients.length && !selectedConversationId}
              />
            </>
          ),
          details: hasConversation && (
            <ChatRoom
              collapseNav={roomNav}
              participants={filteredParticipants}
              loading={conversationLoading}
              messages={conversation?.messages ?? []}
            />
          ),
        }}
      />
    </DashboardContent >
  );
}
