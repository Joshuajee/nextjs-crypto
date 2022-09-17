import { Client, resources } from 'coinbase-commerce-node';
import { products } from '../../data';

Client.init(process.env.COINBASE_API);
const { Charge } = resources;

const coinInitRoute = async(req, res) => {

  const { id } = req.body

  const product = products.find(product => product.id === id)

  try {
    const chargeData = {
      name: product.name,
      description: product.description,
      pricing_type: "fixed_price",
      local_price: {
        amount: product.price,
        currency: product.currency,
      },
      metadata: {
        id: product.id,
        userID: 1
      },
    };
  
    const charge = await Charge.create(chargeData);

    res.send(charge);
  
  } catch (e) {
    res.status(500).send({error:e});
  }

}

export default coinInitRoute