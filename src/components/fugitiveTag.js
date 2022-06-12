import { Tag } from "@blueprintjs/core"
import * as React from "react"
import * as styles from "../styles/components/fugitiveTag.module.css"

const FugitiveTag = props => {
  return (
    <Tag
      // large
      // intent={intent}
      // minimal={minimal}
      {...props}
      className={`bp4-tag ${styles.fugitiveTag}`}
    >
      {props.text}
    </Tag>
  )
}

export default FugitiveTag
