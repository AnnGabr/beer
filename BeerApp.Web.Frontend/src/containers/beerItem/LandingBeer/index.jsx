import { connect } from 'react-redux';

import { BeerItem } from '../../../components/common/BeerItem';

import { changeFavoriteOnLandingPage } from '../../../actions/actionCreators/favorites';

const mapDispatchToProps = (dispatch) => ({
    onFavoriteClick: (favorite, isFavorite) => 
        dispatch(changeFavoriteOnLandingPage(favorite, isFavorite))
});

export default connect(null, mapDispatchToProps)(BeerItem);
