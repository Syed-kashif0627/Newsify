import React from 'react'

 const Newsitem = (props)=> {

    let {title,description,imageUrl,newsUrl,author,date,source} =props;
    return (
      <div className='my-3'>
        <div className="card" style={{width: '21rem'}}>
        <img src={imageUrl?imageUrl:'https://www.searchenginejournal.com/wp-content/uploads/2023/10/ai-image-generation-651e811857e33-sej.png'} className="card-img-top" alt="..."/>
        <div className="card-body">
            <h5 className="card-title">{title}<span class="badge rounded-pill bg-warning" style={{fontSize:"0.7rem"}}>{source}</span></h5>
            <p className="card-text">{description}</p>
            <p className="card-text"> <small className="text-body-secondary">Last updated By {author?author:"Unkown"} on {new Date(date).toGMTString()}</small> </p>
            <a rel='noreferrer' href={newsUrl} target='_blank' className="btn btn-sm btn-dark">Read More</a>
        </div>
        </div>
      </div>
    )
}
export default Newsitem;
