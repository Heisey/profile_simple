
import 'styled-components'

import * as B from '@heisey/componentlib'

declare module 'styled-components' {
  export interface DefaultTheme extends B.Core.I.Theme {}
}