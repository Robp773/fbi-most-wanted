import {
  Button,
  Callout,
  Card,
  Divider,
  Elevation,
  Icon,
  IconSize,
  InputGroup,
  NonIdealState,
  Popover2,
  Position,
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

const IndexPage = data => {
  const { localSearchFugitives } = data.data

  const [query, setQuery] = useState(null)

  const results = useFlexSearch(
    query,
    localSearchFugitives.index,
    localSearchFugitives.store
  )

  console.log(results)
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
        placeholder="Search"
        round={true}
      />
      {/* {results.length > 0 && (
        <Callout intent="success"  className={styles.resultCount}>
          {results.length} results found
        </Callout>
      )} */}
      <div className={styles.nonIdealWrapper}>
        {!query && (
          <NonIdealState
            icon="search"
            title="Enter your search terms"
            description="Example: 'asian brown eyes kevin' will return results for people with asian race, brown eyes, and Kevin in their name."
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
              <div className={styles.fugitiveAliases}>
                {result.aliases &&
                  result.aliases.split(";").map((alias, index) => {
                    return <FugitiveTag minimal key={index} text={alias} />
                  })}
              </div>
              <div className={styles.fugitiveTagWrapper}>
                {result.sex && <FugitiveTag text={result.sex} />}
                {result.race && <FugitiveTag text={result.race} />}
                {result.eyes && <FugitiveTag text={result.eyes} />}
                {result.hair && <FugitiveTag text={result.hair} />}
                {result.weight && <FugitiveTag text={result.weight} />}
                {result.height && <FugitiveTag text={result.height} />}
                {result.nationality && (
                  <FugitiveTag text={result.nationality} />
                )}
              </div>
              <ul className={`${styles.descList} bp4-list bp4-list-unstyled`}>
                {result.description
                  ? result.description.split(";").map((item, index) => {
                      return <li key={index}>{item}</li>
                    })
                  : "No description available"}
              </ul>
              <div className={styles.fugitiveLink}>
                <a href={`/${slugify(result.title)}`}>
                  <Button intent="primary" className={styles.detailsBtn}>
                    Details
                  </Button>
                </a>
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
