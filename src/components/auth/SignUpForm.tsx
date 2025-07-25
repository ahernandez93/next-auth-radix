import { useForm, Controller } from "react-hook-form";
import { Button, Flex, TextField, Text, Heading } from "@radix-ui/themes";
import { EnvelopeClosedIcon, LockClosedIcon, PersonIcon, ExclamationTriangleIcon, CheckCircledIcon } from "@radix-ui/react-icons";

type SignUpFormData = {
    name: string;
    email: string;
    password: string;
};

export default function SignUpForm() {
    const { control, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<SignUpFormData>({
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    });

    const email = watch("email");

    const onSubmit = async (data: SignUpFormData) => {
        console.log("Form data:", data);
        await new Promise(resolve => setTimeout(resolve, 1500));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Flex direction="column" gap="4" className="py-4">
                <Heading size="4" className="text-center mb-2">Create Account</Heading>
                <div className="mb-1">
                    <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                    <Controller
                        name="name"
                        control={control}
                        rules={{
                            required: "Name is required",
                            minLength: {
                                value: 2,
                                message: "Name must be at least 2 characters"
                            }
                        }}
                        render={({ field }) => (
                            <TextField.Root
                                id="name"
                                type="text"
                                placeholder="Enter your name"
                                autoFocus
                                className={`w-full transition-all duration-200 ${errors.name ? 'border-red-500' : ''}`}
                                {...field}
                            >
                                <TextField.Slot>
                                    <PersonIcon height={16} width={16} />
                                </TextField.Slot>
                            </TextField.Root>
                        )}
                    />
                    {errors.name && (
                        <Text size="1" className="text-red-500 mt-1">{errors.name.message}</Text>
                    )}
                </div>

                <div className="mb-1">
                    <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                    <Controller
                        name="email"
                        control={control}
                        rules={{
                            required: "Email is required",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Please enter a valid email address"
                            }
                        }}
                        render={({ field }) => (
                            <TextField.Root
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                className={`w-full transition-all duration-200 ${errors.email ? 'border-red-500' : ''}`}
                                {...field}
                            >
                                <TextField.Slot>
                                    <EnvelopeClosedIcon height={16} width={16} />
                                </TextField.Slot>
                                {email && (
                                    <TextField.Slot>
                                        {errors.email ? (
                                            <ExclamationTriangleIcon className="text-red-500" height={16} width={16} />
                                        ) : (
                                            <CheckCircledIcon className="text-green-500" height={16} width={16} />
                                        )}
                                    </TextField.Slot>
                                )}
                            </TextField.Root>
                        )}
                    />
                    {errors.email && (
                        <Text size="1" className="text-red-500 mt-1">{errors.email.message}</Text>
                    )}
                </div>

                <div className="mb-1">
                    <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
                    <Controller
                        name="password"
                        control={control}
                        rules={{
                            required: "Password is required",
                            minLength: {
                                value: 8,
                                message: "Password must be at least 8 characters"
                            }
                        }}
                        render={({ field }) => (
                            <TextField.Root
                                id="password"
                                type="password"
                                placeholder="**********"
                                className={`w-full transition-all duration-200 ${errors.password ? 'border-red-500' : ''}`}
                                {...field}
                            >
                                <TextField.Slot>
                                    <LockClosedIcon height={16} width={16} />
                                </TextField.Slot>
                            </TextField.Root>
                        )}
                    />
                    {errors.password && (
                        <Text size="1" className="text-red-500 mt-1">{errors.password.message}</Text>
                    )}
                </div>

                <Button
                    type="submit"
                    variant="solid"
                    color="blue"
                    className="w-full mt-4 transition-all duration-200 hover:brightness-110 hover:shadow-md"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <Flex align="center" gap="2" justify="center">
                            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>Creating account...</span>
                        </Flex>
                    ) : (
                        "Sign Up"
                    )}
                </Button>

                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Or continue with</span>
                        </div>
                    </div>
                    <div className="mt-6 grid grid-cols-3 gap-3">
                        <Button variant="outline" className="w-full">
                            <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335"
                                />
                                <path d="M1 1h22v22H1z" fill="none" />
                            </svg>
                            Google
                        </Button>
                        <Button variant="outline" className="w-full">
                            <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path
                                    fillRule="evenodd"
                                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            GitHub
                        </Button>
                        <Button variant="outline" className="w-full">
                            <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path
                                    fillRule="evenodd"
                                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Facebook
                        </Button>
                    </div>
                </div>
            </Flex>
        </form>
    );
}