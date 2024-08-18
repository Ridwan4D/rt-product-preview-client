import PropType from 'prop-types'
const SectionTitle = ({ heading }) => {
    return (
        <div className="text-center my-8 md:w-1/4 mx-auto">
            <h3 className="md:text-4xl md:py-2 border-dashed border-y-2 md:border-4 border-gray-400">{heading}</h3>
        </div>
    );
};
SectionTitle.propTypes = {
    heading: PropType.string,
}
export default SectionTitle;