import React, { Component } from 'react'
import Newsitem from './Newsitem'

export class News extends Component {

    constructor(){
        super();
        console.log('This is constructor of News component')
        this.state={
            articles:[],
            loading:false
        }
    }
    async componentDidMount(){
        let url='https://newsapi.org/v2/everything?q=keyword&apiKey=b7749c9e1895443c99b9f38027c1456b'
        let data=await fetch(url);
        let parseddata=await data.json();
        this.setState({
                articles:parseddata.articles
        })
    }
  render() {
    return (
      <div className='container my-3'>
        <h1>News - Top Headlines</h1>
        <div className="row my-3">
       { this.state.articles.map((ele)=>{
       return(<div className="col md-4" key={ele.url}>
            <Newsitem  title={ele.title?ele.title:""} description={ele.description?ele.description:""} newsUrl={ele.url} imageUrl={ele.urlToImage?ele.urlToImage:'https://www.searchenginejournal.com/wp-content/uploads/2023/10/ai-image-generation-651e811857e33-sej.png'}/>
            </div>
            )
       })}
           
           
        </div>
        
      </div>
    )
  }
}

export default News
