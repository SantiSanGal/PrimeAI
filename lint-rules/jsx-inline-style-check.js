export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow inline styles with more than one property in JSX',
      category: 'Stylistic Issues',
      recommended: false,
    },
    fixable: 'code',
    schema: [], // no options
  },
  create: function (context) {
    return {
      JSXAttribute(node) {
        if (node.name.name !== 'style') return;

        const styleValue = node.value && node.value.expression;
        if (styleValue && styleValue.type === 'ObjectExpression') {
          const properties = styleValue.properties;
          if (properties.length > 1) {
            context.report({
              node: styleValue,
              message:
                'Inline style should have only one property. Consider using a stylesheet object.',
              fix: function (fixer) {
                // Attempt to create a fix by extracting the style into a variable
                const styleVarName = '$' + node.parent.name.name + 'Style';
                const propertiesText = context
                  .getSourceCode()
                  .getText(styleValue);
                const styleObject = propertiesText.replace(/{|}/g, '');
                return [
                  fixer.insertTextBefore(
                    node.parent,
                    `const ${styleVarName} = { ${styleObject} };\n`,
                  ),
                  fixer.replaceText(node.value.expression, styleVarName),
                ];
              },
            });
          }
        }
      },
    };
  },
};
