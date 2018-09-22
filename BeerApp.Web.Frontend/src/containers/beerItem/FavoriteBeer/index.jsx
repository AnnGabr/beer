import { connect } from 'react-redux';

import { BeerItem } from '../../../components/common/BeerItem';
import { changeFavoriteOnFavoritesPage } from '../../../actions/actionCreators/favorites';

const mapStateToProps = () => ({
    isFavorite: true,
    isExpanded: true
});

const mapDispatchToProps = (dispatch) => ({
    onFavoriteClick: (favorite) => dispatch(changeFavoriteOnFavoritesPage(favorite))
});

export default connect(mapStateToProps, mapDispatchToProps)(BeerItem);

