/* eslint-disable isaacscript/format-line-comments */

// THIS CODE WAS AUTOMATICALLY GENERATED.
// DO NOT EDIT THIS FILE BY HAND.
// YOU CAN REGENERATE IT USING:
// npm run generate:rules

import { completeSentencesJSDoc } from "./rules/complete-sentences-jsdoc";
import { completeSentencesLineComments } from "./rules/complete-sentences-line-comments";
import { enumMemberNumberSeparation } from "./rules/enum-member-number-separation";
import { eqeqeqFix } from "./rules/eqeqeq-fix";
import { formatJSDocComments } from "./rules/format-jsdoc-comments";
import { formatLineComments } from "./rules/format-line-comments";
import { jsdocCodeBlockLanguage } from "./rules/jsdoc-code-block-language";
import { memberOrdering } from "./rules/member-ordering";
import { noEmptyJSDoc } from "./rules/no-empty-jsdoc";
import { noExplicitArrayLoops } from "./rules/no-explicit-array-loops";
import { noImplicitMapSetLoops } from "./rules/no-implicit-map-set-loops";
import { noLetAny } from "./rules/no-let-any";
import { noObjectAny } from "./rules/no-object-any";
import { noTemplateCurlyInStringFix } from "./rules/no-template-curly-in-string-fix";
import { noUselessReturnNoFix } from "./rules/no-useless-return-no-fix";
import { noVoidReturnType } from "./rules/no-void-return-type";
import { requireConstAssertions } from "./rules/require-const-assertions";
import { strictEnums } from "./rules/strict-enums";

export const rules = {
  "complete-sentences-jsdoc": completeSentencesJSDoc,
  "complete-sentences-line-comments": completeSentencesLineComments,
  "enum-member-number-separation": enumMemberNumberSeparation,
  "eqeqeq-fix": eqeqeqFix,
  "format-jsdoc-comments": formatJSDocComments,
  "format-line-comments": formatLineComments,
  "jsdoc-code-block-language": jsdocCodeBlockLanguage,
  "member-ordering": memberOrdering,
  "no-empty-jsdoc": noEmptyJSDoc,
  "no-explicit-array-loops": noExplicitArrayLoops,
  "no-implicit-map-set-loops": noImplicitMapSetLoops,
  "no-let-any": noLetAny,
  "no-object-any": noObjectAny,
  "no-template-curly-in-string-fix": noTemplateCurlyInStringFix,
  "no-useless-return-no-fix": noUselessReturnNoFix,
  "no-void-return-type": noVoidReturnType,
  "require-const-assertions": requireConstAssertions,
  "strict-enums": strictEnums,
};
