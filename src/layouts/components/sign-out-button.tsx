import type { ButtonProps } from '@mui/material/Button';
import { useAuth } from 'src/store/KeycloakProvider';
import { toast } from 'src/components/snackbar';
import { useRouter } from 'src/routes/hooks';
import Button from '@mui/material/Button';
import { useCallback } from 'react';

type Props = ButtonProps & {
  onClose?: () => void;
};

export function SignOutButton({ onClose, sx, ...other }: Props) {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = useCallback(async () => {
    try {
      await logout();
      onClose?.();
      // nada más: Keycloak te redirige a /logged-out
    } catch (e) {
      console.error(e);
      toast.error('Unable to logout!');
    }
  }, [logout, onClose]);

  return (
    <Button
      fullWidth
      variant="soft"
      size="large"
      color="error"
      onClick={handleLogout}
      sx={sx}
      {...other}
    >
      Logout
    </Button>
  );
}
