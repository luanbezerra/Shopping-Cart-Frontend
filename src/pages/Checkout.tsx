import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type CheckoutFormData = {
  fullName: string;
  email: string;
  cep: string;
  address: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
};

export function Checkout() {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    mode: "onBlur",
    defaultValues: { country: "Brasil" },
  });

  const cepVal = watch("cep") || "";
  const formatCep = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 8);
    return d.length > 5 ? d.replace(/(\d{5})(\d{1,3})/, "$1-$2") : d;
  };
  const handleCepBlur = async () => {
    const raw = cepVal.replace(/\D/g, "");
    if (raw.length === 8) {
      try {
        const res = await fetch(`https://viacep.com.br/ws/${raw}/json/`);
        const data = await res.json();
        if (!data.erro) {
          setValue("address", data.logradouro || "");
          setValue("neighborhood", data.bairro || "");
          setValue("city", data.localidade || "");
          setValue("state", data.uf || "");
        }
      } catch {}
    }
  };

  const expiryVal = watch("expiry") || "";
  const formatExpiry = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    return d.length >= 3 ? d.replace(/(\d{2})(\d{1,2})/, "$1/$2") : d;
  };

  const onSubmit = (_data: CheckoutFormData) => {
    setShowSuccess(true);
  };

  return (
    <div className="container mx-auto px-4 py-6 relative">
      <h1 className="text-3xl font-bold mb-6">Finalizar Compra</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-700"
          >
            Nome completo
          </label>
          <input
            id="fullName"
            {...register("fullName", {
              required: "Obrigatório",
              minLength: { value: 2, message: "Mínimo 2 caracteres" },
            })}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black"
          />
          {errors.fullName && (
            <p className="text-red-500 text-xs mt-1">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            E-mail
          </label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "Obrigatório",
              pattern: { value: /^\S+@\S+\.\S+$/, message: "Email inválido" },
            })}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-3">
            <label
              htmlFor="cep"
              className="block text-sm font-medium text-gray-700"
            >
              CEP
            </label>
            <input
              id="cep"
              placeholder="00000-000"
              {...register("cep", {
                required: "Obrigatório",
                pattern: { value: /^\d{5}-\d{3}$/, message: "CEP inválido" },
              })}
              onChange={(e) => setValue("cep", formatCep(e.target.value))}
              onBlur={handleCepBlur}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black"
            />
            {errors.cep && (
              <p className="text-red-500 text-xs mt-1">{errors.cep.message}</p>
            )}
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Rua
            </label>
            <input
              id="address"
              {...register("address", { required: "Obrigatório" })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black"
            />
            {errors.address && (
              <p className="text-red-500 text-xs mt-1">
                {errors.address.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="number"
              className="block text-sm font-medium text-gray-700"
            >
              Número
            </label>
            <input
              id="number"
              {...register("number", { required: "Obrigatório" })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black"
            />
            {errors.number && (
              <p className="text-red-500 text-xs mt-1">
                {errors.number.message}
              </p>
            )}
          </div>
          <div className="sm:col-span-3">
            <label
              htmlFor="complement"
              className="block text-sm font-medium text-gray-700"
            >
              Complemento (opcional)
            </label>
            <input
              id="complement"
              {...register("complement")}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div className="sm:col-span-3">
            <label
              htmlFor="neighborhood"
              className="block text-sm font-medium text-gray-700"
            >
              Bairro (opcional)
            </label>
            <input
              id="neighborhood"
              {...register("neighborhood")}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700"
            >
              Cidade
            </label>
            <input
              id="city"
              {...register("city", { required: "Obrigatório" })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black"
            />
            {errors.city && (
              <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="state"
              className="block text-sm font-medium text-gray-700"
            >
              Estado
            </label>
            <input
              id="state"
              {...register("state", { required: "Obrigatório" })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black"
            />
            {errors.state && (
              <p className="text-red-500 text-xs mt-1">
                {errors.state.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700"
          >
            País
          </label>
          <input
            id="country"
            disabled
            {...register("country")}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-full bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div>
          <label
            htmlFor="cardNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Número do cartão
          </label>
          <input
            id="cardNumber"
            inputMode="numeric"
            {...register("cardNumber", {
              required: "Obrigatório",
              pattern: { value: /^\d{16}$/, message: "Deve ter 16 dígitos" },
            })}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black"
          />
          {errors.cardNumber && (
            <p className="text-red-500 text-xs mt-1">
              {errors.cardNumber.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="expiry"
              className="block text-sm font-medium text-gray-700"
            >
              Validade (MM/AA)
            </label>
            <input
              id="expiry"
              placeholder="MM/AA"
              {...register("expiry", {
                required: "Obrigatório",
                pattern: {
                  value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                  message: "Formato inválido",
                },
              })}
              onChange={(e) => setValue("expiry", formatExpiry(e.target.value))}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black"
            />
            {errors.expiry && (
              <p className="text-red-500 text-xs mt-1">
                {errors.expiry.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="cvv"
              className="block text-sm font-medium text-gray-700"
            >
              CVV
            </label>
            <input
              id="cvv"
              inputMode="numeric"
              {...register("cvv", {
                required: "Obrigatório",
                pattern: { value: /^\d{3}$/, message: "3 dígitos" },
              })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black"
            />
            {errors.cvv && (
              <p className="text-red-500 text-xs mt-1">{errors.cvv.message}</p>
            )}
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="
              w-full px-6 py-3
              bg-black text-white
              rounded-full
              font-medium text-lg
              hover:scale-105 hover:shadow-lg
              transition-transform transition-shadow
            "
          >
            Finalizar Pedido
          </button>
        </div>
      </form>

      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md text-center shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Compra Realizada!</h2>
            <p className="mb-6">
              Obrigado pela sua compra. Em breve você receberá a confirmação por
              e-mail.
            </p>
            <button
              onClick={() => navigate("/")}
              className="
                px-6 py-3
                bg-black text-white
                rounded-full
                font-medium text-lg
                hover:scale-105 hover:shadow-lg
                transition-transform transition-shadow
              "
            >
              Voltar à loja
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function formatExpiry(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 4);
  return d.length >= 3 ? d.replace(/(\d{2})(\d{1,2})/, "$1/$2") : d;
}
