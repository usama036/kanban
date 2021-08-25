/**
 * @copyright MrMahir Pvt Ltd - https://mrmahir.com
 * @author Usama Naseer <unaseer932@gmail.com>
 * @since 2021-08-25
 */

module.exports = {
  async new ( req, res ) {
    const inputs = req.allParams();
    const categories = await Category.create({...inputs}).fetch();
    return res.json(categories);

  },

  async list ( req, res ) {
    const list = await Category.find();
    return res.json(list);
  }
};
