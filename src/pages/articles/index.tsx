import { Search } from '@mui/icons-material';
import { IconButton, TextField } from '@mui/material';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import React, { useCallback, useEffect, useState } from 'react';
import ArticleList from 'src/components/articles/article-list';
import SearchContainer from 'src/components/articles/search-container';

const url: string = 'https://jsonplaceholder.typicode.com/posts';

export default function Articles() {
  const [searchTag, setSearchTag] = useState<string>('Frontend');
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchData = (tag: string) => {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        // 데이터 섞기
        setData(json.sort(() => Math.random() - 0.5));
      })
      .catch((error) => setError(`error: ${error}`));
  };

  const handleChange = (e: any) => {
    setSearchTag(e.target.value);
  };

  useEffect(() => {
    fetchData(searchTag);
  }, []);

  return (
    <div className="articles vh-1">
      <div className="inner ">
        <SearchContainer
          searchTag={searchTag}
          onSearch={fetchData}
          onChange={handleChange}
        />
        <ArticleList items={data} />
      </div>
    </div>
  );
}

// TODO: getStaticProps 적용
export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  return {
    props: {
      // host: process.env
    },
  };
};
