import React from "react"
import * as containerStyles from "./container.module.css"

// Anonymous function export is a warning, though I prefer it.
export default function Container({ children }) {
  return <div className={containerStyles.container}>{children}</div>
}
