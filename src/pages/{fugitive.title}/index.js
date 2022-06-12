import React, { useState } from "react"
import { graphql } from "gatsby"
import Seo from "../../components/seo"
import * as styles from "../../styles/pages/fugitive.module.css"
import ImageGallery from "react-image-gallery"
import Layout from "../../components/layout"
import { Callout, Divider, Collapse, Pre, Button } from "@blueprintjs/core"
import FugitiveTag from "../../components/FugitiveTag"
import { capitalizeWords } from "../../helpers/local-search-helpers"
import { Link } from "gatsby"

const images = [
  {
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/",
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
  },
  {
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
  },
]
const FugitivePage = ({ data: { fugitive } }) => {
  console.log(fugitive)

  const [isInfoOpen, setInfoOpen] = useState(true)

  return (
    <Layout>
      <div className={styles.fugitivePage}>
        <Seo title="Fugitive page" />
        <div className={styles.fugitiveContent}>
          <Link className={styles.backLink} to="/"><Button>Back</Button></Link>
          <div className={styles.fugitiveHeading}>
            <div className={styles.headingContent}>
              <h2 className={`${styles.title} bp4-heading`}>
                {fugitive.title}
              </h2>
              {fugitive.warning_message && (
                <Callout
                  className={styles.warning}
                  icon="warning-sign"
                  intent="danger"
                >
                  {fugitive.warning_message}
                </Callout>
              )}
              {fugitive.reward_text && (
                <Callout className={styles.reward} intent="primary">
                  {fugitive.reward_text}
                </Callout>
              )}
              <div className={styles.fugitiveTagWrapper}>
                {fugitive.subjects &&
                  fugitive.subjects.map((subject, index) => {
                    return (
                      <FugitiveTag
                        intent="warning"
                        key={index}
                        text={subject}
                      />
                    )
                  })}
                {fugitive.sex && <FugitiveTag text={fugitive.sex} />}
                {fugitive.race && (
                  <FugitiveTag text={capitalizeWords(fugitive.race)} />
                )}
                {fugitive.eyes && (
                  <FugitiveTag text={capitalizeWords(fugitive.eyes, "eyes")} />
                )}
                {fugitive.hair && (
                  <FugitiveTag text={capitalizeWords(fugitive.hair, "hair")} />
                )}
                {fugitive.weight && <FugitiveTag text={fugitive.weight} />}
                {fugitive.height && <FugitiveTag text={fugitive.height} />}
                {fugitive.nationality && (
                  <FugitiveTag text={fugitive.nationality} />
                )}
                {fugitive.aliases &&
                  fugitive.aliases.map((alias, index) => {
                    return <FugitiveTag minimal key={index} text={alias} />
                  })}
              </div>
            </div>

            <div className={styles.headingGallery}>
              <ImageGallery
                autoPlay
                slideInterval={7000}
                showNav={false}
                showThumbnails={false}
                showBullets
                showPlayButton={false}
                showIndex
                showFullscreenButton={false}
                items={fugitive.images.map(image => {
                  return {
                    ...image,
                    thumbnail: image.thumb,
                    loading: "lazy",
                  }
                })}
              />
            </div>
          </div>

          <div className={styles.fugitiveInfo}>
            {fugitive.remarks && (
              <div className={styles.fugitiveSection}>
                <h5 className="bp4-heading">Remarks</h5>
                <div
                  className="bp4-running-text"
                  dangerouslySetInnerHTML={{ __html: fugitive.remarks }}
                />
              </div>
            )}
            {fugitive.description && (
              <div className={styles.fugitiveSection}>
                <h5 className="bp4-heading">                  {fugitive.details ? "Last Seen" : "Accused Crimes"}
</h5>
                <ul className={`${styles.descList} bp4-list bp4-list-unstyled`}>
                  {fugitive.description.split(";").map((item, index) => {
                    return <li key={index}>{item}</li>
                  })}
                </ul>
              </div>
            )}
            {fugitive.caution && (
              <div className={styles.fugitiveSection}>
                <h5 className="bp4-heading">Description</h5>
                <div
                  className="bp4-running-text"
                  dangerouslySetInnerHTML={{ __html: fugitive.caution }}
                />
              </div>
            )}

            {fugitive.details && (
              <div className={styles.fugitiveSection}>
                <h5 className="bp4-heading">Details</h5>
                <div
                  className="bp4-running-text"
                  dangerouslySetInnerHTML={{ __html: fugitive.details }}
                />
              </div>
            )}

            <div className={styles.fugitiveSection}>
              <h5 className="bp4-heading">Additional Info</h5>
              <div className="bp4-running-text">
                {fugitive.field_offices && (
                  <div>
                    Field Offices:{" "}
                    {fugitive.field_offices.map((office, index) => {
                      return <span key={index}>{office}</span>
                    })}
                  </div>
                )}

                {fugitive.languages && (
                  <div>
                    Languages:{" "}
                    {fugitive.languages.map((language, index) => {
                      return <span key={index}>{language}</span>
                    })}
                  </div>
                )}

                {fugitive.locations && (
                  <div>
                    Locations:{" "}
                    {fugitive.locations.map((location, index) => {
                      return <span key={index}>{location}</span>
                    })}
                  </div>
                )}

                {fugitive.occupations && (
                  <div>
                    Occupations:{" "}
                    {fugitive.occupations.map((occupation, index) => {
                      return <span key={index}>{occupation}</span>
                    })}
                  </div>
                )}

                {fugitive.possible_countries && (
                  <div>
                    Possible Countries:{" "}
                    {fugitive.possible_countries.map((country, index) => {
                      return <span key={index}>{country}</span>
                    })}
                  </div>
                )}

                {fugitive.possible_states && (
                  <div>
                    Possible States:{" "}
                    {fugitive.possible_states.map((state, index) => {
                      return <span key={index}>{state}</span>
                    })}
                  </div>
                )}

                {fugitive.place_of_birth && (
                  <div>Place of Birth: {fugitive.place_of_birth}</div>
                )}

                {fugitive.scars_and_marks && (
                  <div>Scars and Marks: {fugitive.scars_and_marks}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const fugitiveQuery = graphql`
  query ($title: String!) {
    fugitive(title: { eq: $title }) {
      caution
      details
      description
      warning_message
      occupations
      suspects
      remarks
      images {
        caption
        original
        thumb
        large
      }
      field_offices
      coordinates {
        formatted
        lng
        lat
      }
      additional_information
      place_of_birth
      locations
      languages
      reward_text
      scars_and_marks
      url
      title
      sex
      subjects
      race
      person_classification
      nationality
      hair
      eyes
      aliases
      age_min
      publication
      possible_states
      possible_countries
      weight
    }
  }
`

export default FugitivePage
