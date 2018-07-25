import { connect } from 'react-redux';

import { BeerItem } from '../../../components/common/BeerItem';

import { saveFavoriteChange } from '../../../actions/actionCreators/favorites';
import { isFavorite } from '../../../reducers/favorites';

const mapStateToProps = (state, ownProps) => ({
    isFavorite: isFavorite(state, ownProps.id)
});

export default connect(mapStateToProps, { saveFavoriteChange })(BeerItem);
