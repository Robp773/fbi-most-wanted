import { Tag } from "@blueprintjs/core"
import * as React from "react"
import * as styles from "../styles/components/fugitiveTag.module.css"

const FugitiveTag = ({ text, minimal }) => {
  return (
    <Tag minimal={minimal} className={`bp4-tag ${styles.fugitiveTag}`}>
      {text}
    </Tag>
  )
}

export default FugitiveTag
