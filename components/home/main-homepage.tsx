import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormItem, FormLabel, FormField, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from "@/components/ui/select";
import { toast } from "sonner";
import { SettingsSchema } from "@/schemas";
import { settings } from "@/actions/settings";
import { useCurrentUser } from "@/hooks/use-current-user";
import { UserRole } from "@prisma/client";
import { useSession } from "next-auth/react";

export const SettingsMainpanel = () => {
    const [isPending, startTransition] = useTransition();
    const user = useCurrentUser();
    const dateToday = new Date();
    const { update } = useSession();

    const form = useForm<z.infer<typeof SettingsSchema>>({
        resolver: zodResolver(SettingsSchema),
        defaultValues: {
            name: user.session?.name || undefined,
            email: user.session?.email || undefined,
            password: undefined,
            newPassword: undefined,
            role: user.session?.role,
            isTwoFactorEnabled: user.session?.twoFactorAuth || undefined,
        },
    });

    const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
        startTransition(() => {
            settings(values).then((data) => {
                if (data?.success) {
                    update();
                    toast.success(data.success, {
                        description: <>{dateToday.toDateString()}</>,
                        cancel: {
                            label: "Cancelar",
                            onClick: () => toast.info("Cancelado"),
                        },
                    });
                }
            });
        });
    };

    return (
        <div className="overflow-y-auto pl-2 md:pl-4 lg:pl-6 xl:pl-8">
            <div className="mb-2">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Ajustes de Cuenta</h1>
                <p className="text-sm md:text-base">
                    Ajustes personalizables para tu cuenta.
                </p>
            </div>
            <Separator className="dark:bg-slate-800 bg-gray-300 my-2" />

            <Form {...form}>
                <form className="space-y-4 md:space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="space-y-4 md:space-y-6">
                        {/* Datos de usuario */}
                        <h2 className="mb-3 font-semibold text-gray-500">Cuenta de usuario</h2>
                        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                            {/* Nombre */}
                            <FormField control={form.control} name="name" render={({ field }) => (
                                <FormItem className="text-sm md:text-base">
                                    <FormLabel>Nombre</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="border w-full"
                                            {...field}
                                            placeholder="Escribe tu nombre"
                                            disabled={isPending}
                                            type="text"
                                        />
                                    </FormControl>
                                </FormItem>
                            )} />

                            {/* Email */}
                            {user.session?.isOAuth === false && (
                                <FormField control={form.control} name="email" render={({ field }) => (
                                    <FormItem className="text-sm md:text-base">
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="border w-full"
                                                {...field}
                                                placeholder="email@ejemplo.com"
                                                disabled={isPending}
                                                type="email"
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                                />
                            )}
                        </div>
                        <Button
                            disabled={isPending}
                            type="submit"
                            className="variant_btn select-none"
                        >
                            Guardar Cambios
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};
