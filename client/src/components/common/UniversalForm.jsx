import FormField from './FormField';

const UniversalForm = ({
    onSubmit,
    formData,
    onChange = (e) => {
        e.preventDefault();
    },
    loading = false,
    error = null,
    onFileInputChange = () => {},
}) => {
    return (
        <>
            <form onSubmit={onSubmit}>
                {Object.entries(formData).map(([key, value]) =>
                    key === 'image_url' ? (
                        <FormField
                            label={
                                key.substring(0, 1).toUpperCase() +
                                key.substring(1, 5)
                            }
                            type="file"
                            accept="image/*"
                            onChange={onFileInputChange}
                        />
                    ) : (
                        <FormField
                            label={
                                key.substring(0, 1).toUpperCase() +
                                key.substring(1)
                            }
                            type={'text'}
                            value={value}
                            name={key}
                            onChange={onChange}
                        />
                    ),
                )}
                <button
                    type="submit"
                    className="rounded-lg mx-auto bg-green-400 text-white font-bold hover:bg-green-600 px-3 py-2 m-4"
                >
                    {loading ? 'Loading...' : 'Submit'}
                </button>
            </form>
            {error && (
                <p className="text-red-500 font-bolder text-lg">{error}</p>
            )}
        </>
    );
};

export default UniversalForm;
