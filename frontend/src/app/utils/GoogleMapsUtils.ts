<script 
src="https://maps.googleapis.com/maps/api/js?key=<YOUR_API_KEY>&libraries=places&language=no&region=NO&v=quarterly"
async defer>
</script>

export const LoadMapApi = () => {
    const mapsUrl = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places&language=no&region=NO&v=quarterly`;
    const scripts = document.getElementsByTagName('script')

    for (let i = 0; i < scripts.length; i++) {
        if (scripts[i].src.indexOf(mapsUrl) === 0) {
            return scripts[i];
        }
    }

    const googleMapScript = document.createElement('script');
    googleMapScript
}