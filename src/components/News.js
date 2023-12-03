import React, {useEffect,useState} from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'


const News= (props)=> {
 
  const captilize= (word)=>{
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

    const [articles,setArticles]=useState([])
    const [loading,setLoading]=useState(true)
    const [page,setPage]=useState(1)
    const [totalResults,setTotalResults]=useState(0)
    
    document.title=`${captilize(props.category)}- Newsify`
    
    const udpdateNews= async ()=>{
      props.setProgress(10);
      const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
      setLoading(true)
      let data=await fetch(url);
      props.setProgress(30);
      let parseddata=await data.json();
      props.setProgress(70);
      setArticles(parseddata.articles)
      setTotalResults(parseddata.totalResults)
      setLoading(false);
      props.setProgress(100);
    }
      useEffect(()=>{
        udpdateNews();
        // eslint-disable-next-line
      },[])
    
    const fetchMoreData=async ()=>{
      const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
      setPage(page+1)
      let data=await fetch(url);
      let parseddata=await data.json();
      setArticles(articles.concat(parseddata.articles))
      setTotalResults(parseddata.totalResults)
    };
    
    return (
      <>
        <h1 className='text-center' style={{marginTop:'90px',margin:'35px 0px'}}>Newsify - Top {captilize(props.category)} Headlines</h1>
          {loading && <Spinner/>}
          <InfiniteScroll
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={articles.length !== totalResults}
            loader={<Spinner/>}
          >
          <div className="container">
            <div className="row">
                {articles.map((ele,index)=>{
                return <div className="col-md-4" key={index}>
                    <Newsitem  title={ele.title?ele.title:""} description={ele.description?ele.description:""} imageUrl={ele.urlToImage} newsUrl={ele.url} author={ele.author} date={ele.publishedAt} source={ele.source.name} />
                </div>      
                })}
              </div>
          </div>
          </InfiniteScroll>
      </> 
    )
}

News.defaultProps={
  country:'in',
  pageSize:8,
  category:'general'
}
News.propTypes={
  country:PropTypes.string,
  pageSize:PropTypes.number,
  category:PropTypes.string,
}
export default News
