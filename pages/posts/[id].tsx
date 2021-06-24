import Head from "next/head";
import { GetStaticProps, GetStaticPaths} from 'next';

import Layout from "../../components/layout";
import Date from "../../components/date";
import { getAllPostIds, getPostData } from "../../lib/posts";
import utilsStyles from "../../styles/utils.module.css";

export default function Post({ 
  postData 
}: {
  postData: {
    title: string 
    date: string
    contentHtml: string
  }
}) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilsStyles.headingXl}>{postData.title}</h1>
        <div className={utilsStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}


export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  // when fallback: false, any paths not returned by getStaticPaths will result in a 404
  // if falback: true, the paths returned by getStaticPaths will be rendered to html at build time
  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params.id as string);
  return {
    props: {
      postData,
    },
  };
}
