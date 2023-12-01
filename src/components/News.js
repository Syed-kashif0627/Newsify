import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'


export class News extends Component {
  static defaultProps={
    country:'in',
    pageSize:8,
    category:'general'
  }
  static propTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string,
  }
  captilize= (word)=>{
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

    constructor(props){
        super(props);
        console.log('This is constructor of News component')
        this.state={
            articles:[],
            loading:true,
            page:1,
            totalResults:0
        }
    
        document.title=`${this.captilize(this.props.category)}- Newsify`
    }
    async udpdateNews(){
      const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b7749c9e1895443c99b9f38027c1456b&page=${this.state.page}&pageSize=${this.props.pageSize}`
      this.setState({loading:true})
      let data=await fetch(url);
      let parseddata=await data.json();
      this.setState({
              articles:parseddata.articles,
              totalResults:parseddata.totalResults,
              loading:false
      })
    }
    async componentDidMount(){
          this.udpdateNews();
    }
    // handleprevClick=async ()=>{
    //       await this.setState({page:this.state.page-1});
    //       this.udpdateNews();
    // }

    // handlenextClick=async ()=>{
    //     await this.setState({page:this.state.page+1});
    //     this.udpdateNews();
    // }
    fetchMoreData=async ()=>{
      this.setState({page:this.state.page+1})
      const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b7749c9e1895443c99b9f38027c1456b&page=${this.state.page}&pageSize=${this.props.pageSize}`
      let data=await fetch(url);
      let parseddata=await data.json();
      this.setState({
              articles:this.state.articles.concat(parseddata.articles),
              totalResults:parseddata.totalResults,
      })
    }
    
  render() {
    return (
      <>
        <h1 className='text-center'>Newsify - Top {this.captilize(this.props.category)} Headlines</h1>
          {this.state.loading && <Spinner/>}
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !==this.state.totalResults}
            loader={<Spinner/>}>
          <div className="container">
            <div className="row">
                {this.state.articles.map((ele)=>{
                return <div className="col md-4" key={ele.url}>
                    <Newsitem  title={ele.title?ele.title:""} description={ele.description?ele.description:""} newsUrl={ele.url} author={ele.author} date={ele.publishedAt} source={ele.source.name} imageUrl={ele.urlToImage?ele.urlToImage:'https://www.searchenginejournal.com/wp-content/uploads/2023/10/ai-image-generation-651e811857e33-sej.png'}/>
                </div>
                      
                })}
              </div>
            </div>
          </InfiniteScroll>
            {/* {!this.state.loading && <div className="container d-flex justify-content-between">
              <button disabled={this.state.page<=1} type="button" class="btn btn-dark" onClick={this.handleprevClick}>&larr;Previous</button>
              <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)}type="button" class="btn btn-dark" onClick={this.handlenextClick}>Next&rarr;</button>
            </div>} */}
      </> 
    )
  }
}

export default News
