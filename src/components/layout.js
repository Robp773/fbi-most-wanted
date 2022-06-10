import * as React from "react"
import "../styles/components/layout.module.css"
// import { Button, Spinner } from "@blueprintjs/core"
import * as styles from "../styles/components/layout.module.css"


const Layout = ({ children }) => {
  return (
    <div className={`${styles.app}`}>
      <nav className="bp4-navbar bp4-dark">
        <h1 className="bp4-heading">FBI Most Wanted</h1>
      </nav>
      <main className={styles.main}>{children}</main>
      <footer>
        <div className="bp4-text-small bp4-text-muted">
          This app was made as a personal side project and has no affiliation
          with the FBI. All data originates from the{" "}
          <a target="#" href="https://www.fbi.gov/wanted/api">
            FBI Wanted API
          </a>
          .
        </div>
      </footer>
    </div>
  )
}

export default Layout
