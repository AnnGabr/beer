import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { ComponentWithHeader } from '../../components';
import { BeerMainInfo , BeerProperties, BeerFoodPairing, BeerIngredients, BeerMethod } from '../../components/beerDetails';

import './beer-details.css';
const test = [
    "Spicy carne asada with a pico de gallo sauce",
    "Shredded chicken tacos with a mango chilli lime salsa",
    "Cheesecake with a passion fruit swirl sauce"
];

const maininfo = {
    imageUrl: 'https://images.punkapi.com/v2/192.png',
    name: 'some',
    tagline: 'some tagline ipsume dagotten',
    description: "Our flagship beer that kick started the craft beer revolution. This is James and Martin's original take on an American IPA, subverted with punchy New Zealand hops. Layered with new world hops to create an all-out riot of grapefruit, pineapple and lychee before a spiky, mouth-puckering bitter finish.",
    isFavorite: true
}

const test2 = {
    colorEbc: 6,
    internationalBitternessUnits: 130,
    alcoholVolume: 13
};

const method = {
    "mash": [{
        "temp": {
            "value": 65,
            "unit": "celsius"
        },
        "duration": 75
    }],
    "fermentation": {
        "temp": {
        "value": 19.0,
        "unit": "celsius"
        }
    },
    "twist": null
};

const ingr = {
    water: {
        "value": 25,
        "unit": "liters"
    },
    "malt": [
      {
        "name": "Extra Pale",
        "amount": {
          "value": 5.3,
          "unit": "kilograms"
        }
      },
      {
        "name": "Extra Pale",
        "amount": {
          "value": 5.3,
          "unit": "kilograms"
        }
      }
    ],
    "hops": [
      {
        "name": "Ahtanum",
        "amount": {
          "value": 17.5,
          "unit": "grams"
         },
         "add": "start",
         "attribute": "bitter"
       },
       {
         "name": "Chinook",
         "amount": {
           "value": 15,
           "unit": "grams"
         },
         "add": "start",
         "attribute": "bitter"
       }
    ],
    "yeast": "Wyeast 1056 - American Ale™"
};

class BeerDetails extends Component {
    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        const { match } = this.props;
    }

    render() {
        const breawing = `While it may surprise you, this 
        version of Punk IPA isn't dry hopped but still packs a punch! 
        To make the best of the aroma hops make sure they are fully 
        submerged and add them just before knock out for an intense hop hit.`;
        
        return (
            <div className="beer-details">
                <div className="beer-details__main-info">
                    <BeerMainInfo {...maininfo} />
                </div>
                <div className="beer-details__props-pairing">
                    <div className="beer-details__props">
                        <BeerProperties properties={test2}/>
                    </div>
                    <div className="beer-details__pairing">
                        <BeerFoodPairing variants={test} />
                    </div>
                </div>
                <div className="beer-details__brewing-tips">
                    <ComponentWithHeader headerText="brewing">
                        <p>{breawing}</p>
                    </ComponentWithHeader>
                </div>
                <div className="beer-details__ingredients-method">
                    <div className="beer-details__ingredients">
                        <BeerIngredients {...ingr}/>
                    </div>
                    <div className="beer-details__method">
                        <BeerMethod {...method}/>
                    </div>
                </div>   
            </div>
        );    
    }
}

export default withRouter(connect()(BeerDetails));
