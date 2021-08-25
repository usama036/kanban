import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'react-bootstrap';
import   '../css/style.css'

//components
import NewCategory from './NewCategory';
import NewCard from './NewCard';
import NewUser from './NewUser';
/** HomePage functional component */
function HomePage () {
  const [show, setShow] = useState(false);
  const [list, setList] = useState([]);
  const [cardslist, setCardsList] = useState([]);
  const [editCard ,setEditCard] =useState({show:false,data:null});
  const [cardModal, setCardModal] = useState({show:false,category:null});
  const [userCard,setUserCard] = useState(false)
  useEffect(()=>{
   getCategories()
    getCardList()
  },[])

  const getCategories =async ()=>{
    $.get('/category/list').then(res=>setList(res))
  }
  const getCardList = async ()=>{
    $.get('/card/list').then(res=>setCardsList(res))
  }
  const updateCategory=(id,category)=>{
    $.post('/category/update',{id,category}).then(res=>getCardList())
  }
  const deleteCard=(id)=>{
    $.post('/card/remove',{id}).then(res=>getCardList())
  }

  return (
    <>
      <main className="content">
        <div className="container p-0">
          <Button varient="primary" className="float-right btn-outline-success" onClick={()=>setShow(true)}>New Category</Button>
          <Button varient="primary" className="float-right btn-outline-primary ml-2" onClick={()=>setUserCard(true)}>New User</Button>

          <h1 className="h3 mb-3">Kanban Board</h1>
          <div className="row">
            {(list || []).map(category=>
              <div className="col-12 col-lg-6 col-xl-3">
                <div className="card card-border-primary">
                  <div className="card-header">
                    <div className="card-actions float-right">
                      <div className="dropdown show">
                        <a href="#" data-toggle="dropdown" data-display="static">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                            strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-horizontal align-middle">
                            <circle cx="12" cy="12" r="1"/>
                            <circle cx="19" cy="12" r="1"/>
                            <circle cx="5" cy="12" r="1"></circle>
                          </svg>
                        </a>

                        <div className="dropdown-menu dropdown-menu-right">
                          <a className="dropdown-item" href="#">Action</a>
                          <a className="dropdown-item" href="#">Another action</a>
                          <a className="dropdown-item" href="#">Something else here</a>
                        </div>
                      </div>
                    </div>
                    <h5 className="card-title">{category.type}</h5>
                    <h6 className="card-subtitle text-muted">
                      {category.title}
                    </h6>
                  </div>
                  <div className="card-body">
                    {cardslist.filter(card=>
                      card.category===category.type).map(d=>
                      <div className="card mb-3 bg-light">
                        <div className="card-body p-3">
                          <div className="float-right mr-n2">
                            <label className="custom-control custom-checkbox">
                              <input type="checkbox" className="custom-control-input" onChange={()=>updateCategory(d.id,category.type)} />
                              <span className="custom-control-label"></span>
                            </label>
                          </div>
                          <p>{d.title}</p>
                          <p>{d.description}</p>
                          <div className="float-right mt-n1">
                            <img src={d.image} style={{width:32 , height:32}} className="rounded-circle" alt="Avatar"/>
                          </div>
                          <a className="btn btn-outline-primary btn-sm" href="#" onClick={()=>setEditCard({show:true,data:d})}>edit</a>
                          <a className="btn btn-outline-danger btn-sm ml-2" href="#" onClick={()=>deleteCard(d.id)}>Remove</a>

                        </div>
                      </div>
                    )}
                    <a href="#" onClick={() =>setCardModal({show:true,category:category.type})} className="btn btn-primary btn-block">Add new</a>
                  </div>
                </div>
              </div>



            )}

          </div>
          {show &&
          <NewCategory
            onModalClose={() => setShow(false)}
            getCategories={()=>getCategories()}
          />}

          {cardModal.show &&
          <NewCard
            category={cardModal.category}
            onModalClose={() => setCardModal({show: false,category:null})}
            getCardList={()=>getCardList()}
          />
          }

          {editCard.show &&
          <NewCard
            data={editCard.data}
            onModalClose={() => setEditCard({show: false,data:null})}
            getCardList={()=>getCardList()}
          />
          }
          {userCard &&
          <NewUser
            onModalClose={() => setUserCard(false)}
            getCardList={()=>getCardList()}
          />
          }
        </div>
      </main>
</>
)
}

if ( document.getElementById('homepage') ) {
  ReactDOM.render(<HomePage/>, document.getElementById('homepage'));
}
