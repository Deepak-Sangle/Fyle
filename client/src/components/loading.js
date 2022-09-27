import { SpinnerCircular } from 'spinners-react';
import "../styles/loader.css"

const Loading = () => {
    return (
        <div className='loaderDiv'>

            <SpinnerCircular size={65} thickness={180} speed={77} color="rgba(255, 228, 196, 1)" secondaryColor="rgba(172, 86, 57, 0.51)" />
        </div>
    );
}
 
export default Loading;