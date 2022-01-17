import { useState } from 'react';

const About = (props: any) => {
  const { data } = props;

  return (
    <main>
      <h1>{data.post_title}</h1>
      <div dangerouslySetInnerHTML={{ __html: data.post_content }}></div>
    </main>
  );
};
export default About;
