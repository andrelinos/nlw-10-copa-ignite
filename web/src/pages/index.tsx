import { FormEvent, useRef, useState } from "react";
import { Warning } from "phosphor-react";
import Image from "next/image";

import { api } from "../lib/axios";

import { Modal } from "../components/Modal";

import logoImg from "../assets/logo.svg";
import appPreviewImg from "../assets/app-nlw-copa-preview.png";
import usersAvatarExampleImg from "../assets/users-avatar-example.png";
import iconCheckImg from "../assets/icon-check.svg";
import { GetStaticProps } from "next";

interface HomeProps {
  pollCount: number;
  guessCount: number;
  userCount: number;
  error: boolean;
}

export default function Home(props: HomeProps) {
  const cancelButtonRefModal = useRef(null);
  const [openModal, setOpenModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [pollTitle, setPollTitle] = useState("");

  async function createPoll(event: FormEvent) {
    event.preventDefault();

    try {
      const response = await api.post("/polls", {
        title: pollTitle,
      });

      const { code } = response.data;

      await navigator.clipboard.writeText(code);

      setSuccess(true);
      setOpenModal(true);

      setPollTitle("");
    } catch (err) {
      setSuccess(false);
      setOpenModal(true);
    }
  }
  return (
    <>
      <div className="max-w-[1124px] h-screen mx-auto grid grid-cols-2 gap-28 items-center">
        <main>
          {props.error && (
            <span
              className="absolute top-0 right-0 left-0 h-16 flex justify-center items-center
         bg-gray-300 bg-opacity-20 text-center text-red-300 text-opacity-70 gap-2"
            >
              <Warning size={44} weight="thin" /> Ocorreu um erro ao tentar se
              conectar ao banco de dados.
            </span>
          )}
          <Image src={logoImg} alt="NLW Copa" />

          <h1 className="mt-14 text-white text-5xl font-bold leading-tight">
            Crie seu próprio bolão da copa e compartilhe entre amigos!
          </h1>

          <div className="mt-10 flex items-center gap-2">
            <Image src={usersAvatarExampleImg} alt="" />

            <strong className="text-gray-100 text-xl">
              <span className="text-ignite-500">+{props.userCount}</span>{" "}
              pessoas já estão usando
            </strong>
          </div>

          <form onSubmit={createPoll} className="mt-10 flex gap-2">
            <input
              className="flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm text-gray-100"
              type="text"
              required
              placeholder="Qual nome do seu bolão?"
              value={pollTitle}
              onChange={(event) => setPollTitle(event.target.value)}
            />
            <button
              className="bg-yellow-500 px-6 py-4 rounded text-gray-900 font-bold
              text-sm uppercase hover:bg-yellow-700 transition-all"
              type="submit"
            >
              Criar meu bolão
            </button>
          </form>

          <p className="mt-4 text-sm text-gray-300 leading-relaxed">
            Após criar seu bolão, você receberá um código único que poderá usar
            para convidar outras pessoas 🚀
          </p>

          <div className="mt-10 pt-10 border-t border-gray-600 flex items-center justify-between text-gray-100">
            <div className="flex items-center gap-6">
              <Image src={iconCheckImg} alt="" />
              <div className="flex flex-col">
                <span className="font-bold text-2xl">+{props.pollCount}</span>
                <span>Bolões criados</span>
              </div>
            </div>

            <div className="w-px h-14 bg-gray-600" />

            <div className="flex items-center gap-6">
              <Image src={iconCheckImg} alt="" />
              <div className="flex flex-col">
                <span className="font-bold text-2xl">+{props.guessCount}</span>
                <span>Palpites enviados</span>
              </div>
            </div>
          </div>
        </main>

        <Image
          src={appPreviewImg}
          alt="Dois celulares exibindo uma prévia da aplicação do NLW Copa"
          quality={100}
        />
      </div>
      <Modal
        title={success ? "Bolão criado com sucesso" : "Falha ao criar o bolão"}
        open={openModal}
        setOpen={setOpenModal}
        buttonRef={cancelButtonRefModal}
      >
        <span>
          {success
            ? `Bolão criado com sucesso, o código foi copiado para a área de
          transferência!`
            : "Falha ao criar o bolão, tente novamente!"}
        </span>
      </Modal>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const [pollCountResponse, guessCountResponse, userCountResponse] =
      await Promise.all([
        api.get("polls/count"),
        api.get("guesses/count"),
        api.get("users/count"),
      ]);

    return {
      props: {
        pollCount: pollCountResponse.data.count,
        guessCount: guessCountResponse.data.count,
        userCount: userCountResponse.data.count,
        error: false,
      },
      revalidate: 60 * 10, // 10 minutos
    };
  } catch (error) {
    return {
      props: {
        pollCount: 0,
        guessCount: 0,
        userCount: 0,
        error: true,
      },
      revalidate: 30, // 30 segundos
    };
  }
};
// export const getServerSideProps = async () => {
//   try {
//     const [pollCountResponse, guessCountResponse, userCountResponse] =
//       await Promise.all([
//         api.get("polls/count"),
//         api.get("guesses/count"),
//         api.get("users/count"),
//       ]);

//     return {
//       props: {
//         pollCount: pollCountResponse.data.count,
//         guessCount: guessCountResponse.data.count,
//         userCount: userCountResponse.data.count,
//         error: false,
//       },
//     };
//   } catch (error) {
//     return {
//       props: {
//         pollCount: 0,
//         guessCount: 0,
//         userCount: 0,
//         error: true,
//       },
//     };
//   }
// };
