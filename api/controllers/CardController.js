/**
 * CardController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
module.exports = {

  async newCard ( req, res ) {
    const inputs = req.allParams();


    if ( typeof inputs.id !== 'undefined' ) {
      const cards = await Card.updateOne({id:inputs.id}).set({...inputs});

      return res.json(cards)
  } else{
      let result =await Card.findOne({title:inputs.title})
      if(result){
        return res.json('title exist')
      }
      const cards = await Card.create({...inputs}).fetch();
      return res.json(cards)
    }
  },

  async list ( req, res ) {
    const cards = await Card.find();
    return res.json(cards);
  },

  async update ( req, res ) {
    const inputs = req.allParams();
    const categories = await Category.find();
    const types = categories.map(item => item.type);
    const categoryIndex = ( element ) => element === inputs.category;
    const index = types.findIndex(categoryIndex);
    await Card.updateOne({id: inputs.id}).set({category: types[index + 1]});
    return res.json('update');
  },

  async remove ( req, res ) {
    const inputs = req.allParams();
    await Card.destroyOne({id: inputs.id});
    res.json('success');
  }
}
