import { Button, Flex, TextField } from "@radix-ui/themes";
import { EnvelopeClosedIcon, LockClosedIcon, PersonIcon } from "@radix-ui/react-icons";

export default function SignInForm() {
    return (
        <Flex direction="column" gap="2">
            <label htmlFor="name">Name</label>
            <TextField.Root
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                autoFocus
            >
                <TextField.Slot>
                    <PersonIcon height={16} width={16} />
                </TextField.Slot>
            </TextField.Root>

            <label htmlFor="email">Email</label>
            <TextField.Root
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
            >
                <TextField.Slot>
                    <EnvelopeClosedIcon height={16} width={16} />
                </TextField.Slot>
            </TextField.Root>

            <label htmlFor="password">Password</label>
            <TextField.Root
                type="password"
                id="password"
                name="password"
                placeholder="**********"
            >
                <TextField.Slot>
                    <LockClosedIcon height={16} width={16} />
                </TextField.Slot>
            </TextField.Root>

            <Button type="submit" variant="solid" color="blue">
                Sign Up
            </Button>

        </Flex>
    )
}
