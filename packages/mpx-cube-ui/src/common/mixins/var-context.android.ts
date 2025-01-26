import { getMixin, REACTHOOKSEXEC } from '@mpxjs/core'
import { useContext } from 'react'
import { VarContext } from '@mpxjs/webpack-plugin/lib/runtime/components/react/dist/context'

export default getMixin({
  data: {
    varContext: {},
  },
  [REACTHOOKSEXEC]() {
    const varContext = useContext(VarContext);
    if (this.varContext !== varContext) {
      this.varContext = varContext;
    }
  },
});
