import FormField from '../common/FormField.jsx';
import Button from '../common/Button.jsx';

function UserForm({ user, onSubmit, onChange }) {
    return (
        <div>
            <form
                onSubmit={onSubmit}
                className="min-w-[280px] max-w-[480px] w-full"
            >
                <FormField
                    label="First name"
                    name="first_name"
                    type="text"
                    value={user?.first_name || ''}
                    onChange={onChange}
                />
                <FormField
                    label="Last name"
                    name="last_name"
                    type="text"
                    value={user?.last_name || ''}
                    onChange={onChange}
                />
                <FormField
                    label="Location"
                    name="location"
                    type="text"
                    value={user?.location}
                    onChange={onChange}
                />
                <FormField
                    label="Birthdate"
                    name="birthdate"
                    type="date"
                    value={user?.birthdate}
                    onChange={onChange}
                />
                <FormField
                    label="Gender"
                    name="gender"
                    type="text"
                    value={user?.gender}
                    onChange={onChange}
                />
                <Button
                    className="bg-secondary text-white p-2 rounded-md mx-auto px-4"
                    type="submit"
                >
                    Save Changes
                </Button>
            </form>
        </div>
    );
}

export default UserForm;
