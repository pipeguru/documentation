import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  videoSrc: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Easy to Setup',
    videoSrc: 'https://pipeguru.ai/Experimentation_time_bold.mp4',
    description: (
      <>
        Pipeguru was designed from the ground up to be easily installed and setup in under 30 minutes.
      </>
    ),
  },
  {
    title: 'Measure what matters',
    videoSrc: 'https://pipeguru.ai/lower_CAC.mp4', // Example video path
    description: (
      <>
        Drive down acquisition costs and lift conversion rates with your custom definitions and empower your entire team.
      </>
    ),
  },
  {
    title: 'Design 1:1 personalized funnels',
    videoSrc: 'https://pipeguru.ai/last_video.mp4', // Example video path
    description: (
      <>
        Rollout funnels for all your user segments with versioning and rollback in case things go wrong.
      </>
    ),
  },
];

function Feature({title, videoSrc, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className={styles.featureVideoContainer}>
        <video className={styles.featureVideo} autoPlay loop muted playsInline>
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="text--center padding-horiz--md padding-vert--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
