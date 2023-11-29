import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


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

    constructor(){
        super();
        console.log('This is constructor of News component')
        this.state={
            articles:[],
            loading:false,
            page:1
        }

    }
    async componentDidMount(){
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b7749c9e1895443c99b9f38027c1456b&page=1&pageSize=${this.props.pageSize}`
        this.setState({loading:true})
        let data=await fetch(url);
        let parseddata=await data.json();
        this.setState({
                articles:parseddata.articles,
                totalResults:parseddata.totalResults,
                loading:false

        })
    }
    handleprevClick=async ()=>{
      let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b7749c9e1895443c99b9f38027c1456b&page=${this.state.page-1}&pageSize=${this.props.pageSize}`
      let data=await fetch(url);
      let parseddata=await data.json();

      this.setState({
        page: this.state.page-1,
        articles:parseddata.articles,
    })
    }

    handlenextClick=async ()=>{
        if(!(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
          let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b7749c9e1895443c99b9f38027c1456b&page=${this.state.page+1}&pagesize=${this.props.pageSize}`
          this.setState({loading:true})
          let data=await fetch(url);
          let parseddata=await data.json();

          this.setState({
            page: this.state.page+1,
            articles:parseddata.articles,
            loading:false
          })
        }
    }
    
  render() {
    return (
      <div className='container my-3'>
        <div className="text-center">
        <h1 className='text-center'>News - Top Headlines</h1>
          {this.state.loading && <Spinner/>}</div>
        <div className="row my-3">
       { !this.state.loading && this.state.articles.map((ele)=>{
       return(<div className="col md-4" key={ele.url}>
            <Newsitem  title={ele.title?ele.title:""} description={ele.description?ele.description:""} newsUrl={ele.url} imageUrl={ele.urlToImage?ele.urlToImage:'https://www.searchenginejournal.com/wp-content/uploads/2023/10/ai-image-generation-651e811857e33-sej.png'}/>
            </div>
            )
       })}
            {!this.state.loading && <div className="container d-flex justify-content-between">
              <button disabled={this.state.page<=1} type="button" class="btn btn-dark" onClick={this.handleprevClick}>&larr;Previous</button>
              <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)}type="button" class="btn btn-dark" onClick={this.handlenextClick}>Next&rarr;</button>
            </div>}
           
        </div>
        
      </div>
    )
  }
}

export default News
