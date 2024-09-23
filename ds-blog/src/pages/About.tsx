import { useEffect } from 'react'

import aboutPicture from '../assets/about-picture.jpg'
import './About.css'
import { useTitleStore } from '../store'

const aboutTitle = 'Diego B.'

export function About () {
  const setTitle = useTitleStore(state => state.setTitle)

  useEffect(() => {
    setTitle(aboutTitle)
  }, [setTitle])

  return (
    <div className='about-container'>
      <img src={aboutPicture} alt='person-with-glasses' />
      <section id='about-me'>
        <label>About Me</label>
        <p>
          As a passionate and experienced Full Stack Developer, I am dedicated
          to creating engaging, practical, maintainable, and robust information
          systems focused on solving real world problems for people so that the
          world can be just a tad bit better. I started my software journey by
          making custom maps on Warcraft III's World Editor and after being
          extremely lucky in finding specific types of people (to whom I'm
          extremely thankful to this day) in my walk of life, I managed to
          discover my passion for technology, software development but overall:
          <b> Problem Solving</b>. I always focus on solving issues, and
          building technology around these solutions, I have a vast amount of
          knowledge both in theoretical approaches alongside practical but I
          pride myself on the use of a pragmatic approach, always working as a
          team when necessary, and always remaining hungry for knowledge.
        </p>
      </section>
      <section id='skills'>
        <label>Skills:</label>
        <ul>
          <li>
            Extensive experience in UI porting from design tools such as Figma
            and Zeplin into Angular and React solutions with Mobile-First and
            Desktop-First approaches.
          </li>
          <li>
            Proficiency in development and collaboration tools such as Gitlab,
            Github, Azure DevOps (CI/CD, SDLC).
          </li>
          <li>
            Excellent design and implementation skills both for architectural
            structures alongside multi-purpose day-to-day code. (Microservices,
            Monoliths, Modular Monoliths).
          </li>
          <li>
            Strong communication and collaboration skills, with the ability to
            work with both small to medium-sized teams.
          </li>
          <li>
            Willingness and experience with leadership roles both from the
            mentorship perspective but also organization of work and enablement
            of team members.
          </li>
          <li>
            Vast experience with best practices and tendencies when it comes to
            Restful APIs and Web Systems.
          </li>
          <li>
            Excellent experience with streaming architectures specifically with
            Apache Flink, and the ELK Stack.
          </li>
        </ul>
      </section>
      <section id='experience'>
        <label>Experience:</label>
        <ul>
          <li>
            5 years of experience as a Full Stack Developer, working on a
            variety of projects for clients in different industries but focused
            on high transaction sytems for health, banking and financial
            institutions. (Angular, .NET, React)
          </li>
          <li>
            Experience in conducting performance and benchmarking for high
            throughput applications.
          </li>
          <li>
            Designed and implemented integration efforts between multiple
            systems through APIs and different architectural patterns.
          </li>
          <li>
            Implemented Threat Modeling efforts in order to mitigate risks and
            document design decisions in cross-functional software development
            teams.
          </li>
          <li>
            2 years of experience with Java, Kotlin and Prime NG techonologies
            for Web System Development.
          </li>
        </ul>
      </section>
      <section id='education'>
        <label>Education:</label>
        <ul>
          <li>Bachelor's Degree in System Engineering</li>
          <li>GitHub Foundations Certified</li>
          <li>Associate's Degree as a Network and Hardware Techinician</li>
        </ul>
      </section>
    </div>
  )
}
