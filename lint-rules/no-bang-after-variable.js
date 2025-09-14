export default {
  meta: {
    type: 'problem',
    docs: {
      description: "disallow the use of '!' after variables",
      category: 'Possible Errors',
      recommended: true,
    },
    schema: [], // no options
  },
  create: function (context) {
    return {
      Identifier(node) {
        const sourceCode = context.getSourceCode();
        const nextToken = sourceCode.getTokenAfter(node);

        if (
          nextToken &&
          nextToken.type === 'Punctuator' &&
          nextToken.value === '!'
        ) {
          context.report({
            node: nextToken,
            message: "Unexpected use of '!' after variable.",
          });
        }
      },
    };
  },
};
