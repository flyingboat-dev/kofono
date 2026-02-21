import { A } from "@solidjs/router";
import { CgFormatCenter } from "solid-icons/cg";
import { FaBrandsSquareGitlab } from "solid-icons/fa";
import { H2 } from "@/components/html";
import { Search } from "@/components/search";
import { ThemeSwitcher } from "@/components/theme-switcher";

export function Header() {
    return (
        <div class="px-4 py-2 bg-primary shadow-2xl ">
            <div class="flex flex-row justify-between ">
                <H2 class="m-0 p-0 leading-10 text-primary-content font-bold">
                    <A href={"s"}>
                        {/*<TbForms />*/}
                        <CgFormatCenter class="inline-block w-6 h-6 mr-2 -mt-1 text-primary-content/70 " />
                        <span class="bg-primary-content/10 p-2 rounded-md">
                            Kofono docs
                        </span>
                        <sup class="ml-2 -mt-1 font-light text-xs">
                            v0.4.6 &#123;latest&#125;
                        </sup>
                    </A>
                </H2>
                <div class="flex flex-row gap-2 align-bottom">
                    <Search />
                    <a
                        href={import.meta.env.VITE_GITURL}
                        target="_blank"
                        class="btn btn-primary">
                        <FaBrandsSquareGitlab class="w-6 h-6" />
                    </a>
                    <ThemeSwitcher />
                </div>
            </div>
        </div>
    );
}
