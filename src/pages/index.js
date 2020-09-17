import React,{useState,useContext,useEffect} from "react"
import { Context } from "../store/appContext"
import { isMobile } from "react-device-detect"
import {useWindowSize} from "../utils/hooks"
import Layout from "../components/Layout"
import Section from "../components/Section"
import Sponsors from "../components/Sponsors"
import JobSearch from "../components/JobSearch"
import Workshops from "../components/Workshops"
import KeySkillsDesktop from "../components/KeySkillsDesktop"
import KeySkillsMobile from "../components/KeySkillsMobile"
import { TopNav } from "../components/TopNav"
import ResourceIcon from "../components/ResourceIcon"
import {Button, Badge, CardDeck} from "react-bootstrap"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import beaconURL from "../images/beacon-logo.png"
import Container from "react-bootstrap/Container"
import Bubble from "../images/Chat-Bubbles.png"
import DownloadGuide from "../components/DownloadGuide"
import Briefcase from "../images/briefcase.svg"
import CalendarStar from "../images/calendar-star.svg"
import ChartNetwork from "../images/chart-network.svg"
import CommentPlus from "../images/comment-plus.svg"

const breakpoint = (width) => {
    if(width < 350) return "xs";
    if(width < 576) return "sm";
    if(width < 768) return "md";
    if(width < 992) return "lg";
    return "xl";
}
export default function Home() {
    const { store, actions } = useContext(Context)
    const [skill,setSkill] = useState(null);
    const [type, setType] = useState("cloud-computing")
    const [course,setCourse] = useState(null);
    const [width,height] = useWindowSize();

    const keySkillsMenu = store &&
      (
        store.skill_pathways.map(item =>
          Object.assign(
            {},
            {
              label: item.skill_pathway_name,
              key: item.skill_pathway_slug,
            }
          )
        )
      ).sort((a, b) =>
        a.label.localeCompare(b.label, "en", { sensitivity: "base" })
      ) || []
    const meta = store && store.homepageData.meta || []
    
          
    const heroFeatures = [
      {
        title: "Job Postings",
        bg: "#7CE6C8",
        to: "jobs",
        icon: <Briefcase fill="#4F8B7A" />,
    },
    {
        title: "Skill Pathways",
        bg: "#4044AA",
        to: "career",
        icon: <ChartNetwork fill="#F8FAFA" />,
    },
    {
        title: "Career Coaching",
        bg: "#CACACA",
        to: "coaching",
        icon: <CommentPlus fill="#F8FAFA" />,
    },
    {
        title: "Events & Resources",
        bg: "#F9DE8E",
        to: "events",
        icon: <CalendarStar fill="#E1BB44" />,
      },
    ]

    
    return (
      <Layout bodyClass="home" description="" lang="en" meta={meta}>
        <Section name="hero" className="home-hero h-100 position-relative">
          <TopNav links={store && store.navMenu} />
          <Container className="py-4">
            <Row className="mb-lg-5 mx-auto">
              <Col xs={12}>
                <h1 className="mb-3">Find a new career in Miami Tech</h1>
                <h2>Fast-track to a job through curated education pathways</h2>
              </Col>
            </Row>
            <Row className="pt-lg-5 feature-row container mx-auto">
              {heroFeatures.map((item, index) => (
                <Col xs={6} md={4} lg={3} key={index}>
                  <ResourceIcon
                    to={item.to}
                    title={item.title}
                    bg={item.bg}
                    icon={item.icon}
                  />
                </Col>
              ))}
            </Row>
          </Container>
        </Section>

        <Section name="jobs" className="explore-jobs">
          <Container className="exjob">
            <Row className="mb-5 mx-auto">
              <Col xs={12}>
                <h1 className="mb-3 exjoTitle">
                  Explore <span>jobs you'll love</span>
                </h1>
                <h2 className="exjoSub">from companies hiring locally</h2>
              </Col>
            </Row>
          </Container>
          <JobSearch
            width={width}
            jobs={store && Array.isArray(store.jobs) ? store.jobs : []}
            scrollEnd={() => actions.get("jobs", { limit: 6, orderby: 'posted_date'})}
            skills={
              store && Array.isArray(store.skill_pathways)
                ? store.skill_pathways
                : []
            }
          />
        </Section>

        <Section
          name="career"
          id="career"
          className={
            width <= 1080 || isMobile
              ? "key-skills mobile d-flex flex-column align-items-center justify-content-center py-5"
              : "key-skills d-flex flex-column align-items-center justify-content-center"
          }
        >
          <Container>
            <h2
              className={
                width <= 1080 || isMobile
                  ? "text-white mb-0"
                  : "text-white mb-3"
              }
            >
              <span className="text-warning">Learn</span> Key Skills
            </h2>
            <p
              className={
                width <= 1080 || isMobile
                  ? "text-warning mb-5 pb-0"
                  : "text-warning h2 mb-5 pb-5"
              }
            >
              to land jobs of the future
            </p>
          </Container>
          {width <= 990 || isMobile ? (
            <KeySkillsMobile
              keySkillsMenu={keySkillsMenu}
              courseData={store && store.programs}
              course={course}
              setCourse={setCourse}
              setSkill={setSkill}
              skill={skill}
              type={type}
              setType={setType}
              path={
                store &&
                store.skill_pathways.find(
                  item => item.skill_pathway_slug === type
                )
              }
            />
          ) : (
            <KeySkillsDesktop
              keySkillsMenu={keySkillsMenu}
              courseData={store && store.programs}
              course={course}
              setCourse={setCourse}
              setSkill={setSkill}
              skill={skill}
              type={type}
              setType={setType}
              path={
                store &&
                store.skill_pathways.find(
                  item => item.skill_pathway_slug === type
                )
              }
            />
          )}
        </Section>

        <Section name="coaching" id="coaching" className="career-coaching">
          <Container className="coachingSec mb-5">
            <h1 className="mb-3 coachTitle">
              Free <span>Career Coaching</span>
            </h1>
            <h2 className="coachSub">discover your path that lies ahead</h2>
          </Container>
          <div className="two-types-of-coaching pb-5">
            <Row>
              <Col md={6} className="left-coaching">
                <div className="left-line-flare"></div>
                <h3>Want to break into tech?</h3>
                <h4 className="text-left py-4 text-white font-weight-normal mb-5">
                  We have practical experience helping people for all walks of
                  life switch to jobs in tech.
                </h4>
                <div className="bottom">
                  <a
                    href="https://calendly.com/miamitechworkscoach/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-lg"
                  >
                    Book a time
                  </a>
                </div>
              </Col>
              <Col md={6} className="right-coaching">
                <div className="right-line-flare">
                  <div className="right-dot-flare"></div>
                </div>
                <h3>Looking for a new tech job?</h3>
                <h4 className="text-left py-4  text-white font-weight-normal mb-5">
                  We can help you identify opportunities that fit your profile
                  and review your job search process.
                </h4>
                <div className="bottom">
                  <a
                    href="https://calendly.com/miamitechworkscoach/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-lg"
                  >
                    Book a time
                  </a>
                </div>
              </Col>
            </Row>
            {/* </Container> */}
          </div>
        </Section>

        <Section name="events" className="section-events">
          <Container className="eventContainer">
            <Row className="mb-5 mx-auto">
              <Col xs={12}>
                <h1 className="mb-3 eventTitle">
                  Events <span>& Resources</span>
                </h1>
                <h2 className="eventSub">
                  Network and make connections virtually
                </h2>
              </Col>
            </Row>
            <Row className="mb-5 mx-auto workshopRow">
              <Col xs={12}>
                <h2 className="workshopTitle">Upcoming Workshops</h2>
              </Col>
            </Row>
          </Container>

          <Workshops
            width={width}
            events={store && Array.isArray(store.events) ? store.events : []}
            scrollEnd={() => actions.get("events", { limit: 6, orderby: 'event_date' })}
          />
        </Section>

        {/* <Section name="job-search" className="job-search">
          <div className="container">
            <h2 className="text-left">Want to nail your job search?</h2>
            <h3 className="text-left py-1">
              check out our free job search filed guide
            </h3>
            <p className="pt-5 pb-3">
              30 exclusive tips & tricks form recruiting pros for navigating
              your search ducing COVID-19
            </p>
            <DownloadGuide className="btn btn-primary btn-lg">Download Guide</DownloadGuide>
          </div>
        </Section> */}

        <Section name="sponsors" className="section-sponsors">
          <Container>
            <h2 className="text-center">MiamiTech.Works Coalition</h2>
            <h3 className="text-center">Made possible by</h3>
            <div className="mb-2">
              <img src={beaconURL} />
            </div>
            <div className="logos">
              <Sponsors />
            </div>
          </Container>
        </Section>
      </Layout>
    )
}
