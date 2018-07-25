import { connect } from 'react-redux';

import { BeerItem } from '../../../components/common/BeerItem';
import { changeFavorite } from '../../../actions/actionCreators/favorites';

const mapStateToProps = () => ({
    isFavorite: true,
    isExpanded: true
});

export default connect(mapStateToProps, { changeFavorite })(BeerItem);

