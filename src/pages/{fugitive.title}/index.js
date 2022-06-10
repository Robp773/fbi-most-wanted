import * as React from "react"
import { graphql } from "gatsby"
import Seo from "../../components/seo"

const FugitivePage = ({ data }) => {
  console.log(data)
  return (
    <div>
      <Seo title="Fugitive page" />
      fugitive page
    </div>
  )
}

export const fugitiveQuery = graphql`
  query ($title: String!) {
    fugitive(title: { eq: $title }) {
      title
      reward_text
    }
  }
`

export default FugitivePage
