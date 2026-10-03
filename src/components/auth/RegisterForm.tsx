import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useRegister } from "@/features/users/useRegister";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router";

type RegisterFormValues = {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
};

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { signupUser, isLoading } = useRegister();
  const { t } = useTranslation();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<RegisterFormValues>();

  function onSubmit(data: RegisterFormValues) {
    signupUser({
      fullName: data.fullName,
      email: data.email,
      password: data.password,
    });
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">{t("auth.registerTitle")}</CardTitle>
          <CardDescription>{t("auth.registerSubtitle")}</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="fullName">{t("auth.fullName")}</FieldLabel>
                <Input
                  id="fullName"
                  type="text"
                  autoComplete="name"
                  placeholder={t("auth.fullNamePlaceholder")}
                  aria-invalid={!!errors.fullName}
                  {...register("fullName", {
                    required: t("auth.fullNameRequired"),
                  })}
                />
                {errors.fullName && (
                  <p className="text-sm text-destructive">
                    {errors.fullName.message}
                  </p>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="email">{t("auth.email")}</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  dir="ltr"
                  autoComplete="email"
                  placeholder="m@example.com"
                  aria-invalid={!!errors.email}
                  {...register("email", {
                    required: t("auth.emailRequired"),
                  })}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="password">{t("auth.password")}</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  dir="ltr"
                  autoComplete="new-password"
                  aria-invalid={!!errors.password}
                  {...register("password", {
                    required: t("auth.passwordRequired"),
                    minLength: {
                      value: 6,
                      message: t("auth.passwordMin"),
                    },
                  })}
                />
                {errors.password && (
                  <p className="text-sm text-destructive">
                    {errors.password.message}
                  </p>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="confirmPassword">
                  {t("auth.confirmPassword")}
                </FieldLabel>
                <Input
                  id="confirmPassword"
                  type="password"
                  dir="ltr"
                  autoComplete="new-password"
                  aria-invalid={!!errors.confirmPassword}
                  {...register("confirmPassword", {
                    required: t("auth.confirmRequired"),
                    validate: (value) =>
                      value === getValues("password") ||
                      t("auth.passwordMismatch"),
                  })}
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-destructive">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </Field>

              <Field>
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading
                    ? t("auth.creatingAccount")
                    : t("auth.createAccount")}
                </Button>

                <FieldDescription className="text-center">
                  {t("auth.haveAccount")}{" "}
                  <Link
                    to="/login"
                    state={location.state}
                    className="font-medium underline underline-offset-4"
                  >
                    {t("auth.login")}
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
