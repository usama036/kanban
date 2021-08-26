
module.exports = {
  async newUser ( req, res ) {
    const inputs = req.allParams();
    if ( typeof inputs.id !== 'undefined' ) {
      const cards = await User.updateOne({id:inputs.id}).set({...inputs});
      return res.json(cards)
    } else{
      let password = await sails.helpers.passwords.hashPassword(inputs.password);
      const cards = await User.create({...inputs,password,userType:'admin'}).fetch();
      return res.json(cards)
    }
  },
}
