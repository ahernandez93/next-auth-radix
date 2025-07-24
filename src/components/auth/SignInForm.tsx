import { Button, Flex, TextField } from "@radix-ui/themes";
import { EnvelopeClosedIcon, LockClosedIcon } from "@radix-ui/react-icons";

export default function SignInForm() {
    return (
        <Flex direction="column" gap="2">
            <label htmlFor="email">Email</label>
            <TextField.Root
                id="email"
                name="email"
                placeholder="Enter your email"
                autoFocus
            >
                <TextField.Slot>
                    <EnvelopeClosedIcon height={16} width={16} />
                </TextField.Slot>
            </TextField.Root>

            <label htmlFor="password">Password</label>
            <TextField.Root
                id="password"
                name="password"
                placeholder="**********"
            >
                <TextField.Slot>
                    <LockClosedIcon height={16} width={16} />
                </TextField.Slot>
            </TextField.Root>

            <Button type="submit" variant="solid" color="blue">
                Sign In
            </Button>

        </Flex>
    )
}
