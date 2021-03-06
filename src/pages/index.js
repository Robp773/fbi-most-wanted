import {
  Button,
  Card,
  Elevation,
  Icon,
  IconSize,
  InputGroup,
  NonIdealState,
  Tooltip,
} from "@blueprintjs/core"
import slugify from "@sindresorhus/slugify"
import { graphql } from "gatsby"
import debounce from "lodash.debounce"
import React, { useState } from "react"
import { useFlexSearch } from "react-use-flexsearch"
import FugitiveTag from "../components/FugitiveTag"
import Layout from "../components/layout"
import Seo from "../components/seo"
import "../styles/pages/index.module.css"
import * as styles from "../styles/pages/index.module.css"
import { Link } from "gatsby"

const IndexPage = data => {
  const { localSearchFugitives } = data.data

  const [query, setQuery] = useState(null)

  const results = useFlexSearch(
    query,
    localSearchFugitives.index,
    localSearchFugitives.store
  )
  return (
    <Layout>
      <Seo title="Most Wanted List" />
      <InputGroup
        onChange={debounce(e => {
          setQuery(e.target.value)
        }, 250)}
        className={styles.fugitiveSearch}
        type="search"
        large
        leftIcon="search"
        intent="primary"
        placeholder="Example: 'cuban fraud benitez'"
        round={true}
      />
      <div className={styles.nonIdealWrapper}>
        {!query && (
          <NonIdealState
            icon="search"
            title="Enter your search terms"
            description="Search terms can refer to a fugitive's name or aliases, eye or hair color, gender, race, nationality, weight, height, alleged crimes, or occupations."
          />
        )}

        {results.length === 0 && query && (
          <NonIdealState
            icon="warning-sign"
            title="No results found"
            description="Try tweaking your search query and double check spelling."
          />
        )}
      </div>

      <div className={styles.fugitiveGrid}>
        {results.map((result, index) => {
          return (
            <Card
              className={styles.fugitiveCard}
              key={index}
              elevation={Elevation.TWO}
            >
              <img
                alt={result.title}
                className={styles.fugitiveImg}
                src={result.images[0].thumb}
              />
              <h5 className="bp4-heading">
                {result.title}
                {result.warning_message && (
                  <Tooltip
                    className={styles.fugitiveTooltip}
                    intent="danger"
                    content={result.warning_message}
                  >
                    <Icon
                      icon="warning-sign"
                      size={IconSize.LARGE}
                      intent="danger"
                    />
                  </Tooltip>
                )}
              </h5>
              <div className={styles.fugitiveTagWrapper}>
                {result.subjects &&
                  result.subjects.map((subject, index) => {
                    return (
                      <FugitiveTag
                        intent="warning"
                        key={index}
                        text={subject}
                      />
                    )
                  })}
                {result.sex && <FugitiveTag text={result.sex} />}
                {result.race && <FugitiveTag text={result.race} />}
                {result.eyes && <FugitiveTag text={result.eyes} />}
                {result.hair && <FugitiveTag text={result.hair} />}
                {result.weight && <FugitiveTag text={result.weight} />}
                {result.height && <FugitiveTag text={result.height} />}
                {result.nationality && (
                  <FugitiveTag text={result.nationality} />
                )}
                {result.aliases &&
                  result.aliases.split(";").map((alias, index) => {
                    return <FugitiveTag minimal key={index} text={alias} />
                  })}
              </div>
              <ul className={`${styles.descList} bp4-list bp4-list-unstyled`}>
                {result.description
                  ? result.description.split(";").map((item, index) => {
                      return <li key={index}>{item}</li>
                    })
                  : "No description available"}
              </ul>
              <div className={styles.fugitiveLink}>
                <Link to={`/${slugify(result.title)}`}>
                  <Button icon="info-sign" intent="primary">
                    Details
                  </Button>
                </Link>
              </div>
            </Card>
          )
        })}
      </div>
    </Layout>
  )
}
export const query = graphql`
  query {
    localSearchFugitives {
      id
      name
      store
      index
    }
  }
`

export default IndexPage
