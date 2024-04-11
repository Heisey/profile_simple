
import * as Core_keys from '../keys'

export type EmailStage = 
    typeof Core_keys.emailStage.FORM 
  | typeof Core_keys.emailStage.SUCCESS 
  | typeof Core_keys.emailStage.ERROR