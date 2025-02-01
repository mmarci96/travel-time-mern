import AnimatedComponent from './AnimatedComponent';
import FormField from './FormField';
import LoadAnimation from './LoadAnimation';

const UniversalForm = ({
    onSubmit,
    formData,
    onChange,
    loading = false,
    error = null,
    onFileInputChange = () => {},
    submitText = 'Submit',
    additionalButtons = null,
}) => {
    return (
        <AnimatedComponent
            children={
                <form
                    onSubmit={onSubmit}
                    className="min-w-[280px] max-w-[480px] w-full"
                >
                    {Object.entries(formData).map(([key, value], i) =>
                        key === 'image_url' ? (
                            <FormField
                                key={i}
                                label="Image"
                                type="file"
                                accept="image/*"
                                onChange={onFileInputChange}
                            />
                        ) : (
                            <FormField
                                key={i}
                                label={
                                    key.charAt(0).toUpperCase() + key.slice(1)
                                }
                                type={
                                    key.includes('password')
                                        ? 'password'
                                        : key.includes('email')
                                          ? 'email'
                                          : 'text'
                                }
                                value={value}
                                name={key}
                                onChange={onChange}
                            />
                        ),
                    )}
                    {error && <p className="text-red-500 text-md">{error}</p>}

                    <div className="flex justify-center gap-4 mt-4">
                        {loading ? (
                            <LoadAnimation />
                        ) : (
                            <>
                                <button
                                    type="submit"
                                    className="rounded-lg bg-green-400 text-white font-bold hover:bg-green-600 px-3 py-2"
                                >
                                    {submitText}
                                </button>
                                {additionalButtons}
                            </>
                        )}
                    </div>
                </form>
            }
        />
    );
};

export default UniversalForm;
