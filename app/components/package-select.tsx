import classNames from "classnames";
import { Link, useLoaderData, useParams } from "@remix-run/react";
import invariant from "tiny-invariant";
import { type SerializeFrom } from "@remix-run/node";
import iconsHref from "~/icons.svg";
import { DetailsMenu } from "~/modules/details-menu";
import { DetailsPopup } from "./details-popup";
import { PopupLabel } from "./popup-label";
import { type loadPackageNames } from "~/components/docs-menu/data.server";

type Pkg = Awaited<SerializeFrom<ReturnType<typeof loadPackageNames>>>;

export function PackageSelect() {
  let { pkgs } = useLoaderData() as { pkgs: Pkg };
  invariant(pkgs, "Expected loaderData.pkgs");

  let { pkg } = useParams();
  invariant(pkg, "Expected params.pkg");

  return (
    <DetailsMenu className="relative cursor-pointer">
      <summary className="relative flex cursor-pointer list-none items-center justify-between gap-3 border border-gray-100 px-3 py-1 rounded-full">
        <span>{pkg}</span>
        <svg aria-hidden className="h-[18px] w-[18px] text-gray-400">
          <use href={`${iconsHref}#dropdown-arrows`} />
        </svg>
      </summary>
      <DetailsPopup>
        <div className="my-2">
          <PopupLabel label="Select a package" />
          {pkgs
            .sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity))
            .map((p) => (
              <PackageLink key={p.name} pkg={p.name} active={p.name === pkg} />
            ))}
        </div>
      </DetailsPopup>
    </DetailsMenu>
  );
}

function PackageLink({ pkg, active }: { pkg: string; active: boolean }) {
  let className =
    "relative pl-4 group items-center flex py-1 before:mr-4 before:relative before:top-px before:block before:h-1.5 before:w-1.5 before:rounded-full before:content-['']";
  return active ? (
    <span
      className={classNames(
        className,
        "font-bold text-red-brand before:bg-red-brand"
      )}
    >
      {pkg}
    </span>
  ) : (
    <Link
      to={pkg}
      className={classNames(
        className,
        "hover:bg-gray-50 active:text-red-brand dark:text-gray-200 dark:hover:bg-gray-700 dark:active:text-red-brand"
      )}
    >
      {pkg}
    </Link>
  );
}
