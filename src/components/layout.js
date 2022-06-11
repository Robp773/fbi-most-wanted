import * as React from "react"
import "../styles/components/layout.module.css"
// import { Button, Spinner } from "@blueprintjs/core"
import * as styles from "../styles/components/layout.module.css"
import { StaticQuery, graphql } from "gatsby"
import { Callout, Icon, IconSize, Tooltip } from "@blueprintjs/core"

const Layout = ({ children }) => {
  return (
    <StaticQuery
      query={graphql`
        query {
          site {
            buildTime(fromNow: true)
          }
        }
      `}
      render={data => {
        return (
          <div className={`${styles.app}`}>
            <nav className="bp4-navbar bp4-dark">
              <h1 className="bp4-heading">FBI Most Wanted</h1>
              <div>
                Last sync: {data.site.buildTime}
                <Tooltip
                  className={styles.syncTooltip}
                  intent="primary"
                  content="Search results are synced with the FBI Wanted database twice a day."
                >
                  <Icon
                    icon="info-sign"
                    size={IconSize.SMALL}
                    intent="primary"
                  />
                </Tooltip>
              </div>
            </nav>
            <main className={styles.main}>{children}</main>
            <footer>
              <Callout intent="primary">
                This app was made as a personal side project and has no
                affiliation with the FBI. All data originates from the{" "}
                <a target="#" href="https://www.fbi.gov/wanted/api">
                  FBI Wanted API
                </a>
                .
              </Callout>
            </footer>
          </div>
        )
      }}
    />
  )
}

export default Layout
