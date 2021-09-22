import React, { Suspense } from "react"
const ZuHeComp = React.lazy(()=>import('./ZuHeComp'))
function LazyComp() {
    return(
        <Suspense fallback={<div>loading……</div>}>
            <ZuHeComp/>
        </Suspense>
    )
}
export default LazyComp